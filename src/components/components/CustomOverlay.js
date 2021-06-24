import {Overlay} from "react-bootstrap";


export default function CustomOverlay(props) {
    const message = props.message

    const getColor = () => {
        if (props.variant === "danger") {
            return 'rgba(255, 100, 100, 0.85)';
        }
        else if (props.variant === "info") {
            return 'rgba(23, 162, 184, 0.85)'
        }
        else if (props.variant === "primary") {
            return 'rgba(0, 123, 255, 0.85)'
        }
        else if (props.variant === "warning") {
            return 'rgba(255, 193, 7, 0.85)'
        }
        else if (props.variant === "success") {
            return 'rgba(40, 167, 69, 0.85)'
        }
    }

    return (
        <Overlay target={props.target.current} show={props.visible} placement="right">
            {({ placement, arrowProps, show: _show, popper, ...props }) => (
                <div
                    {...props}
                    style={{
                        backgroundColor: getColor(),
                        padding: '2px 10px',
                        color: 'white',
                        borderRadius: 3,
                        ...props.style,
                    }}
                >
                    {message}
                </div>
            )}
        </Overlay>
    )
}
