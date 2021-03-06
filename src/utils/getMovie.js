import { tmdb, discover, posterUrl } from './fetchInfo'
import getVideo from './getYTVideo'

const baseUrl = `${tmdb.baseUrl}${discover.url}${tmdb.apiKey}`

const random = (min, max) => {
    const resultado = Math.floor(Math.random() * (max - min + 1)) + min
    return resultado
}


const getMovie = async (language, sort, year, genre, page) => {
    try {
        const response = await fetch(`${baseUrl}${language}${sort}${year}${genre}${page}`)
        const jsonResponse = await response.json()
        if (jsonResponse.total_results > 0) {
            const movies = jsonResponse.results
            const max = movies.length - 1;
            const index = random(0, max)
            return movies[index]
        }
        else {
            alert("Película no encontrada :((")
        }

    }
    catch {
        alert("Datos incorrectos para la búsqueda")
    }

}

const validateData = (language, sort, year, genre) => {
    const page = random(1,3)
    const data = new Array(5)
    data[0] = language ? `${discover.language}${language}` : ""
    data[1] = sort ? `${discover.sort}${sort}` : ""
    data[2] = year ? `${discover.year}${year}` : ""
    data[3] = genre ? `${discover.genre}${genre}` : ""
    data[4] = `${discover.page}${page}`
    return data
}

const renderMovie = async (language, sort, year, genre) => {
    const data = validateData(language, sort, year, genre)
    const movie = await getMovie(...data)
    if (movie) {
        //Contenedor para mostrar datos de la película
        const container = document.createElement('article')
        container.classList.add('container')
        //Mostrar el poster
        const image = document.createElement('img')
        image.width = '300'
        image.height = '350'
        image.style.backgroundColor = '#000'
        image.src = `${posterUrl}${movie.poster_path}`        
        //Info
        const movieInfo = document.createElement('div')
        movieInfo.classList.add('movie-info')
        //Título
        const title = document.createElement('h1')
        title.textContent = movie.title
        //Sinópsis
        const description = document.createElement('p')
        description.textContent = movie.overview

        //Fecha de lanzamiento
        const release = document.createElement('h3')
        const releaseYear = movie.release_date.split("-")[0]
        release.textContent = releaseYear

        movieInfo.append(title, description, release)
        const wrapper = document.createElement('div')
        wrapper.classList.add('movie-container')
        wrapper.append(image, movieInfo)
        // video
        let langQ= "movie trialer"
        if(language === "es-MX"){
            langQ = "película trailer latino"
        }
        const q = `${movie.title} ${langQ} (${releaseYear})`        
        const videoId = await getVideo(q)
        const video_container = document.createElement('div')
        const botoncito = document.createElement('button')
        botoncito.textContent="Ver trailer"
        let trailerShown = false
        botoncito.addEventListener('click', ()=>{
            if(videoId && !trailerShown){                                
                video_container.classList.add('video-container')
                const iframe = document.createElement('iframe')
                iframe.allow="accelerometer; autoplay; ecrypted-media; gyroscope; picture-in-picture"
                iframe.allowFullscreen = true                     
                iframe.src = `https://www.youtube.com/embed/${videoId}`
                video_container.append(iframe)      
                trailerShown = true        
                window.scrollTo( 0, 1000 );      
            }
            else{            
                const request = confirm("¿Deseas abrir Youtube?")
                if(request){
                    window.open(`https://www.youtube.com/results?search_query=${q}`, '_blank')                
                }
            }

        })        
        
        container.append(wrapper, botoncito, video_container)
        return container
    }
}

export default renderMovie