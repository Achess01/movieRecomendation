import './css/index.css'
import {renderGenres} from './utils/getGenres'

if(module.hot){
    module.hot.accept()
}
const button = document.querySelector('#search')
const inputYear = document.querySelector('#year')
const selectGenre = document.querySelector('#genre')

renderGenres(selectGenre)
inputYear.addEventListener('input', function(){
    if(this.value.length > 4){
        this.value = this.value.slice(0,4)
    }
    // if(!isNaN(this.value)){
    //     let value = parseInt(this.value)                                
    // }else{
    //     this.value = ""
    // }
})

