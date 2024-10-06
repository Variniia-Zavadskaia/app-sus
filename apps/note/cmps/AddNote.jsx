const { useEffect, useState, useRef } = React

export function AddNote() {

    const [changeType, setCangeType] = useState('');

    const [showTitle, setShowTitle] = useState(false);
    const titleRef = useRef(null);
  
    const handleFocusOut = (event) => {
      let relatedTarget = event.relatedTarget;
      if (!relatedTarget) {
        setShowTitle(false);
      }
    };
  
    return (
        <div className="add-note">

      <form  onBlur={handleFocusOut}>
        <input
          id="title"
          ref={titleRef}
          style={{ display: showTitle ? '' : 'none' }}
          placeholder="Title"
        />
        <input
          id="content"
          onFocus={() => setShowTitle(true)}
          placeholder="Take a note..."
        />
      </form>
        </div>
    );
    // const [form, setForm] = useState('')


    // useEffect(()=>{
    //     console.log(changeType);    
    // },[changeType])

    // function loadForm() {

    // }

    // switch (changeType) {
    //     case'NoteImg' :

    //         break;
    //     case'NoteTodos' :

    //         break;
    // }

    // function handleChange() {
    //     const type = xxx;
    //     //....
    //     setCangeType(type)
    // }

    return (
        <section>
            {/* <input type="text" placeholder='note' onClick={() => setCangeType('NoteTxt')}/>
            <button className="btn" onClick={() => setCangeType('NoteImg')} ><i className="fa-solid fa-image"></i></button> */}
            {/* <Link to="/note/edit" ><button className="btn backdrop"><i className="fa-solid fa-image"></i></button></Link> */}
                
        </section>
    )
}

// function DynamicCmp(props) {
//     // console.log('props:', props)
//     switch (props.cmpType) {
//         case '' :
//             return (
//                 <section>
//                     <input type="text" placeholder='note' onClick={() => setCangeType('NoteTxt')}/>
//                     <button className="btn" onClick={() => setCangeType('NoteImg')} ><i className="fa-solid fa-image"></i></button>
//                     {/* <Link to="/note/edit" ><button className="btn backdrop"><i className="fa-solid fa-image"></i></button></Link> */}
//                 </section>
//             )
//         case 'NoteTxt':
//         case 'NoteImg':
//         case 'NoteTodos':
//             return <NoteEdit />
//     }
// }

function DynamicCmp(props) {
    // console.log('props:', props)
    switch (props.cmpType) {
        case 'NoteTxt':
            // return <Hello name={props.name} age={props.age} handleClick={props.handleClick} />
            return <NoteTxt {...props} />
        case 'NoteImg':
            return <NoteImg {...props} />

        case 'NoteTodos':
            return <NoteTodos {...props} />
    }

}

// function MyForm() {
//   const [showTitle, setShowTitle] = useState(false);
//   const titleRef = useRef(null);

//   const handleFocusOut = (event) => {
//     let relatedTarget = event.relatedTarget;
//     if (!relatedTarget) {
//       setShowTitle(false);
//     }
//   };

//   return (
//     <form onBlur={handleFocusOut}>
//       <input
//         id="title"
//         ref={titleRef}
//         style={{ display: showTitle ? '' : 'none' }}
//         placeholder="Title"
//       />
//       <input
//         id="content"
//         onFocus={() => setShowTitle(true)}
//         placeholder="Take a note..."
//       />
//     </form>
//   );
// }

