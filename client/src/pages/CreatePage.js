import {React, useState, useEffect, useContext} from 'react'
import { AuthContext } from '../context/AuthContext';
import {useHttp} from '../hooks/http.hook';
import {useHistory} from 'react-router-dom';

const CreatePage = props => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const [link, setLink] = useState('')
    const { request } = useHttp()

    useEffect(() => {
        window.M.updateTextFields()
    }, [])

    const pressHandler = async e => {
        if (e.key === 'Enter'){
            try {
                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    authorization: `Bearer ${auth.token}`
                })
                console.log(data)
                history.push(`/detail/${data.link._id}`)

            } catch (error) {}
        }
    }

    return(
        <div className="row">
            <div className="col s8 offset-s2">
            <div className="input-field">
                <input 
                    placeholder="Enter link" 
                    id="link" 
                    type="text" 
                    value={link}
                    onChange={ e => setLink(e.target.value) }
                    onKeyPress={ pressHandler }
                />
                <label htmlFor="link">Enter link</label>
            </div>
            </div>
        </div>
    ) 
 }
 
 export default CreatePage