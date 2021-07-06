import {Button, ButtonGroup, Dropdown, DropdownButton, ListGroup} from "react-bootstrap";
import styles from "../list.module.css";
import ListItem from "./ListItem";
import {BsFillCaretLeftFill, BsFillCaretRightFill} from "react-icons/all";
import {useEffect, useState} from "react";


export default function List(props) {
    const [currentPage, setCurrentPage] = useState(1)
    const [lastPage, setLastPage] = useState(1)
    const [rows, setRows] = useState([])

    const pageSizeOptions = [
        {value: 10, label: "10"},
        {value: 50, label: "50"},
        {value: 100, label: "100"}
    ]

    const [pageSize, setPageSize] = useState(pageSizeOptions[0])

    const onPageSizeSelected = (value) => {
        const newPageSize = pageSizeOptions.find(e => e.value === parseInt(value, 10))
        setPageSize(newPageSize)
        setCurrentPage(1)
    }

    useEffect(() => {
        const offset = (currentPage - 1) * pageSize.value
        const limit = offset + pageSize.value

        props.service.getAll(offset, limit)
            .then(response => {
                const rows = props.parseRows(response.data)
                setRows(rows)
            })

        props.service.count()
            .then(response => {
                const total = response.data
                const lastPage = Math.max(1,  Math.ceil(total /pageSize.value))
                setLastPage(lastPage)
            })

    }, [pageSize, currentPage])

    const nextPage = () => {
        setCurrentPage(old => ++old)
    }

    const previousPage = () => {
        setCurrentPage(old => --old)
    }

    const isFirstPage = () => {
        return currentPage === 1
    }

    const isLastPage = () => {
        return currentPage === lastPage
    }

    return (
        <div className={"container-fluid"}>
            <div className={"row"}>
                <div className={"col"}>

                    <ListGroup className={`${styles.dirsTableList}`}>
                        <div className="col-6">
                            <div className="container">
                                <div className="row marginBottom">
                                    <div className={"col text-left"}>
                                        <DropdownButton className={`float-left marginRight`} variant="secondary" title={pageSize.label} onSelect={onPageSizeSelected}>
                                            {pageSizeOptions.map(o =>
                                                <Dropdown.Item key={o.value} eventKey={o.value}>
                                                    {o.label}
                                                </Dropdown.Item>
                                            )}
                                        </DropdownButton>
                                    </div>
                                    <div className={"col text-right"}>
                                        <label>{currentPage}/{lastPage}</label>
                                        <ButtonGroup className={"marginLeft"}>
                                            <Button className="buttonIcon" variant="secondary" onClick={previousPage} disabled={isFirstPage()}><BsFillCaretLeftFill /></Button>
                                            <Button className="buttonIcon" variant="secondary" onClick={nextPage} disabled={isLastPage()}><BsFillCaretRightFill /></Button>
                                        </ButtonGroup>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <ListGroup.Item className="col-6">
                            <div className="container">
                                <div className="row">
                                    {props.header.map(item => {
                                        return (
                                            <div className={`col ${styles.columns} text-center`} key={item}>
                                                <b>{item}</b>
                                            </div >
                                        )
                                        })
                                    }
                                    {(props.onEdit || props.onDefault || props.onRemove) ?
                                        <div className={`col ${styles.columns} text-center`}>
                                        </div >
                                        :
                                        ""
                                    }
                                </div>
                            </div>
                        </ListGroup.Item>

                        {rows.map(row => (
                                <ListItem
                                    key={row.id}
                                    id={row.id}
                                    cols={row.cols}
                                    onEdit={props.onEdit}
                                    onDefault={props.onDefault}
                                    onRemove={props.onRemove}
                                />
                            )
                        )}
                    </ListGroup>
                </div>
            </div>
        </div>
    )
}
