import React, { useState } from 'react';

function DynamicFormComponent() {
    // const [formFields, setFormFields] = useState([{value: '' }]);
    const [nickName, setNickName] = useState('default');
    const [newTimer, setNewTimer] = useState([1]);

    const handleAddFields = () => {
        const t = [...newTimer, 1];
        setNewTimer(t);
        // const values = [...formFields, {value: '' }];
        // setFormFields(values);
    };

    const handleRemoveFields = (index) => {
        if (newTimer.length === 1) {
            alert('타이머는 최소 한개 이상이어야 합니다.');
            return;
        }

        const values = [...newTimer];
        values.splice(index, 1);
        setNewTimer(values);
        
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

        const response = fetch("http://localhost:5000/append", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({
                "title" : nickName,
                "userId" : "user",
                "timer" : newTimer
            }),
        
        }).then((res) => {
            alert("타이머 추가 성공!");
            console.log(res.json);
            return res.json();

        })
        .catch(() => {
            console.log("There's no reponse from the server.");
            return null;
        })
    };

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
                        value={newTimer[index]}
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