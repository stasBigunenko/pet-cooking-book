import React, {useState} from 'react';

const UploadForm = () => {

    const [file, setFile] = useState(null)
    const [error, setError] = useState(null)

    // allowed types of images
    const types = ['image/png', 'image/jpeg']

    const changeHandler = (e) => {
        let selected = e.target.files[0]
        console.log(selected)

        if (selected && types.includes(selected.type)) {
            setFile(selected)
            setError('')
        }else{
            setFile(null)
            setError('Please select an image file with the correct type (png or jpeg)')
        }
    }

    return (
        <div>
            <input disabled={true} type="file" onChange={changeHandler}/>
            <div className="output">
                { error && <div className="error">{ error }</div>}
                { file && <div className="file.name">{ error }</div>}
            </div>
        </div>
    );
};

export default UploadForm;