import './css/index.css'
import {renderGenres} from './utils/getGenres'
import renderMovie from './utils/getMovie'

if(module.hot){
    module.hot.accept('./css/index.css')
}
const button = document.querySelector('#search')
const inputYear = document.querySelector('#year')
const selectGenre = document.querySelector('#genre')
const lang = document.querySelector('#lang')
const selectOrder = document.querySelector('#order')
const movieNode = document.querySelector('#showMovie')

renderGenres(selectGenre)


button.addEventListener('click', async ()=>{
    let language = null
    let year = null
    let order = null
    let genre = null
    if(lang.selectedIndex >= 0 && lang.selectedIndex< lang.length){
        language = lang.value                
    }    
    if(inputYear.value >= 1888 && inputYear.value <= 2100){
        year = inputYear.value
    }
    if(selectOrder.selectedIndex >= 0 && selectOrder.selectedIndex< selectOrder.length){
        order = selectOrder.value
    }    
    if(selectGenre.selectedIndex > 0 && selectGenre.selectedIndex< selectGenre.length){
        genre = selectGenre.value
    }    
    movieNode.innerHTML= ""
    const movie = await renderMovie(language, order, year, genre)    
    if(movie){
        movieNode.append(movie)
    }
    
})

inputYear.addEventListener('input', function(){
    if(this.value.length > 4){
        this.value = this.value.slice(0,4)
    }    
})

