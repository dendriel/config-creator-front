import {Button, ButtonGroup} from "react-bootstrap";
import {BsFillCaretDownFill, BsFillCaretUpFill, BsTrashFill} from "react-icons/all";
import CustomOverlay from "./CustomOverlay";
import {useRef, useState} from "react";


export default function ListItemController(props) {
    const removeButtonTarget = useRef(null)
    const [toRemove, setToRemove] = useState(false)

    const onRemove = () => {
        if (!toRemove) {
            setToRemove(true)
            setTimeout(() => {setToRemove(false); }, 1000);
            return;
        }

        console.log("Remove")
        props.remove(props.id)
    }

    const findIndex = () => {
        let id = props.list.findIndex(e => e.key === props.id)
        if (id === -1) { // gambiarra
            // TODO: use key instead of id in template-create
            return props.list.findIndex(e => e.id === props.id)
        }
        return id
    }

    const isLastElement = () => {
        const index = findIndex()
        return (index+1) === props.list.length
    }

    const isFirstElement = () => {
        const index = findIndex()
        return index === 0;
    }

    return (
        <>
            <ButtonGroup>
                <Button className="buttonIcon" variant="secondary" onClick={() => props.move(findIndex(), -1)} disabled={isFirstElement()}><BsFillCaretUpFill /></Button>
                <Button className="buttonIcon" variant="secondary" onClick={() => props.move(findIndex(), 1)} disabled={isLastElement()}><BsFillCaretDownFill /></Button>
            </ButtonGroup>
            <>
                <Button className="marginLeft" ref={removeButtonTarget} variant="danger" onClick={onRemove} disabled={props.saving}>
                    <BsTrashFill className="buttonIcon"/>
                </Button>
                <CustomOverlay
                    target={removeButtonTarget}
                    visible={toRemove}
                    message={"Double Click to remove"}
                    variant={"danger"}
                />
            </>
        </>
    )
}
