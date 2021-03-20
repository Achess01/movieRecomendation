import {yt} from './fetchInfo'

const getVideo = async (q)=>{
    try {        
        const response = await fetch(`${yt.url}${q}${yt.key}`)           
        const infoResponse = await response.json()        
        if(!infoResponse.error){
            const infoVideo = infoResponse.items[0].id.videoId                
            return infoVideo
        }
        return null        
    } catch (error) {
        console.error(error.message)    
    }
        
}

export default getVideo