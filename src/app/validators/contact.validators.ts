import { AbstractControl } from "@angular/forms";
import { debounceTime, map, timer } from "rxjs";

export function noEnglishLetters(control: AbstractControl) {
    const isOnlyLetters = (/^[a-zA-Z ]*$/ig).test(control.value)
    return !isOnlyLetters ? { noEnglishLetters: true } : null
}


export function nameTaken(control: AbstractControl) {
    return timer(1000)
        .pipe(
            debounceTime(500),
            map(() => {
                if (control.value === 'bobo') return { nameTaken: true }
                return null
            })
        )
}

// export function nameTaken(control: AbstractControl) {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             if (control.value === 'bobo') {
//                 resolve({ nameTaken: true })
//             } else {
//                 resolve(null)
//             }
//         }, 1000)
//     })
// }