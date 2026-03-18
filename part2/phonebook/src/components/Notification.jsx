const baseStyle={
    padding:'10px',
    borderRadius:'2px',
    marginBottom:'20px',
    fontSize:'20px',
    background:'lightGrey'
}
const successStyle={
    ...baseStyle,
    color:'green',
    border:'1px solid green',
}
const errorStyle={
    ...baseStyle,
    color:'red',
    border:'1px solid red'
}

const Notification=({message,type})=>{
    const style= type==='error'? errorStyle : successStyle ;
    if(message===null){
        return null;
    }
    return(<div style={style}>
                {message}
    </div>)
}

export default Notification;