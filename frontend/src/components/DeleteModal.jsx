export default function DeleteModal({
    open,
    title,
    onCancel,
    onDelete,
}){

    if(!open) return null;

    return(

        <div
            style={{
                position:"fixed",
                inset:0,
                background:"rgba(0,0,0,.45)",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                zIndex:9999,
            }}
        >

            <div
                style={{
                    width:420,
                    background:"#fff",
                    borderRadius:18,
                    padding:24,
                    boxShadow:"0 20px 60px rgba(0,0,0,.35)",
                }}
            >

                <h2>Delete Chat?</h2>

                <p
                    style={{
                        color:"#64748b",
                        marginTop:12,
                        lineHeight:1.6
                    }}
                >
                    Are you sure you want to delete
                    <br />
                    <strong>{title}</strong> ?
                </p>

                <div
                    style={{
                        display:"flex",
                        justifyContent:"flex-end",
                        gap:12,
                        marginTop:24,
                    }}
                >

                    <button
                        onClick={onCancel}
                        style={{
                            padding:"10px 18px",
                            borderRadius:10,
                            border:"none",
                            background:"#e5e7eb",
                            cursor:"pointer",
                        }}
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onDelete}
                        style={{
                            padding:"10px 18px",
                            borderRadius:10,
                            border:"none",
                            background:"#dc2626",
                            color:"#fff",
                            cursor:"pointer",
                            fontWeight:600,
                        }}
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>

    );
}