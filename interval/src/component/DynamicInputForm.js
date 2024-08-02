import React, { useEffect, useState } from 'react';

function DynamicFormComponent() {
    const [formFields, setFormFields] = useState([{value: '' }]);
    const [nickName, setNickName] = useState('default');
    const [newTimer, setNewTimer] = useState([0]);

    const handleAddFields = () => {
        const t = [...newTimer, 0];
        setNewTimer(t);
        // const values = [...formFields, {value: '' }];
        // setFormFields(values);
    };

    const handleRemoveFields = (index) => {
        if (newTimer.length === 1) {
            alert('타이머는 최소 한개 이상이어야 합니다.');
            return;
        }
        console.log(index);
        console.log([...newTimer]);

        // const t = [...newTimer].splice(index, 1);
        const values = [...newTimer].splice(index, 1);
        setNewTimer(values);
        // console.log(t);
        // setNewTimer(t);
        // if (formFields.length === 1) {
        // alert('At least one form must remain');
        // return;
        // }
        // const values = [...formFields].splice(index, 1);
        // setFormFields(values);
    };

    const handleInputChange = (index, e) => {
        const values = [...newTimer];
        // const values = [...formFields];
        values[index] = e.target.value;

        // if (e.target.name === 'name') {
        // values[index].name = e.target.value;
        // } else {
        // values[index].value = e.target.value;
        // }
        // setFormFields(values);

        setNewTimer(values);
        console.log(index, values);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formFields);
        // const response = fetch("http://localhost:5000/append", {
        //     method : "POST",
        //     headers : {
        //         "Content-Type" : "application/json",
        //     },
        //     body : JSON.stringify({
        //         "title" : formFields.title,
        //         "userId" : "user"
        //     }),
        
        // }).then((res) => {
        //     return res.json();

        // })
        // .catch(() => {
        //     console.log("Can't load any data from server");
        //     return null;
        // })
    };

    useEffect(() => {
        console.log('formFields changed:', formFields);
        console.log(formFields.title);
    }, [formFields]);

    return (
        <div className = "dynamic-input">
            <form onSubmit={handleSubmit} style={{ padding: '2%' }}>
                <input type ="text" placeholder='타이머 닉네임을 입력하세요.' id = "title" onChange={(e) => {
                    setNickName(e.target.value);
                    console.log({nickName});
                }}
                required
                ></input>
            {newTimer.map((field, index) => (
                <div key={index} style={{ marginBottom: 5 }}>
                    <input
                        type='number'
                        placeholder='단위 : 분'
                        name='value'
                        value={field.value}
                        onChange={(e) => handleInputChange(index, e)}
                        style={{ marginRight: 10 }}
                        required
                    />

                    <button type='button' onClick={() => handleRemoveFields(index)}>
                        제거
                    </button>
                </div>
            ))}

            <button
                type='button'
                onClick={() => handleAddFields()}
                style={{ marginTop: 10, marginRight: 10 }}
            >
                추가
            </button>

            <button type='submit'>설정 완료</button>
            </form>
        </div>
    );
}

export default DynamicFormComponent;