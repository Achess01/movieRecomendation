import info from './fetchInfo'

const getGenres = async (url)=>{    
    try {            
        const genres = await fetch(url);
        const parseGenres = await genres.json()
        return parseGenres
    } catch (error) {
        return ["Not found"]
    }
}

export const renderGenres = async (selectGenres)=>{
    const response = await getGenres(`${info.M.baseUrl}${info.M.genre}${info.M.apiKey}&language=es-MX`)    
    const genres = response.genres
    const options = genres.map(genre =>{
        let op = document.createElement('option')
        op.value = genre.id
        op.textContent = genre.name        
        return op
    })
    console.log(options)
    selectGenres.append(...options)
}