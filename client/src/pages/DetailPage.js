import {React, useContext, useState, useCallback, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import {useHttp} from '../hooks/http.hook';
import {AuthContext} from '../context/AuthContext';
import Loader from '../components/Loader';
import LinkCard from '../components/LinkCard';

const DetailPage = props => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [link, setLink] = useState(null)
    const linkId = useParams().id

    const getLink = useCallback(async () => {
        console.log('Link id ', linkId);
        console.log('token ', token);

        try {
            const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
                Authorization: `Bearer: ${token}`
            })  
            setLink(fetched)
            
        } catch (error) {}
    }, [token, linkId, request])

    useEffect(() => {
        getLink()
    }, [getLink])

    if (loading){
        return <Loader />
    }

    return(
        <div>
            { !loading && link && <LinkCard link={link}/>}
        </div>
    ) 
 }
 
 export default DetailPage