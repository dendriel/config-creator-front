import {Alert} from "react-bootstrap";
import React, {createContext, useContext, useEffect, useState} from "react";
import {useLocation} from "react-router";

const AlertContext = createContext({});

export default function AlertProvider ({children}) {

    const [alert, setAlert] = useState({message:'', visible:false})

    let location = useLocation();

    useEffect(() => {
        closeAlert()
    }, [location]);

    const dismiss = () => {
        setAlert(prev => {
            return {
                ...prev,
                visible: false
            }
        })
    }

    const alertSuccess = (message) => {
        setAlert({
            message: message,
            variant: 'success',
            visible: true
        })
    }

    const alertError = (message) => {
        setAlert({
            message: message,
            variant: 'danger',
            visible: true
        })
    }

    const alertWarning = (message) => {
        setAlert({
            message: message,
            variant: 'warning',
            visible: true
        })
    }

    const closeAlert = () => {
        setAlert({
            ...alert,
            visible: false
        })
    }

    return(
            <>
                {alert.visible ?
                    <Alert variant={alert.variant} onClose={dismiss} dismissible>
                        {alert.message}
                    </Alert>
                    : null
                }
                <AlertContext.Provider
                    value={
                        {
                            closeAlert: closeAlert,
                            alertSuccess: alertSuccess,
                            alertError: alertError,
                            alertWarning: alertWarning
                        }
                    }
                >
                    {children}
                </AlertContext.Provider>
        </>)
}

export const useAlert = () => useContext(AlertContext)
