
import { useEffect, useState } from "react"
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Head from "next/head";

export const Up = () => {
    const [scroll, setScroll] = useState(true)

    function screenUp() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    return (
        <div>
            <div onClick={screenUp}
                className="scroll"
                style={{
                    position: 'fixed',
                    backgroundColor: '#FFF',
                    bottom: 20,
                    right: 20,
                    display: scroll ? 'flex' : 'none',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 40,
                    height: 40,
                    boxShadow: '0 0 5px #333',
                    borderRadius: 5,
                    cursor: 'pointer',
                    zIndex: 999

                }}
            >
                <ExpandLessIcon style={{ width: '100%', height: '100%', color: '#e40e0e' }} />
            </div>
        </div>

    )
}
