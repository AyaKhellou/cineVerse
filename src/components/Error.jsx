
export default function Error({err}){
    return(
        <>
            <h2 className="error">Error loading favorites</h2>
            <p className="error-msg">{err?.message || String(err)}</p>
            <button onClick={() => window.location.reload()}>Retry</button>
        </>
    )
}


