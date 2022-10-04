import { palavroes } from './words';


export const CurseWords = (text: string) => {
    let list = []
    for (let p of palavroes) {
        if (text.toLowerCase().includes(p.toLowerCase())) {
            list.push(p)
        }
    }
    return list.length > 0 ? false : true

}


