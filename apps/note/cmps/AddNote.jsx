const { useState } = React

export function AddNote() {

    const [changeType, setCangeType] = useState();

    // switch (changeType) {
    //     case'NoteImg' :

    //         break;
    //     case'NoteTodos' :

    //         break;
    // }

    function handleChange() {
        const type = xxx;
        //....
        setCangeType(type)
    }

    //common render
}



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