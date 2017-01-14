import Rx from 'rxjs/Rx';

const firstName = document.querySelector('#first-name');
const secondName = document.querySelector('#second-name');
const fullName = document.querySelector('#full-name');

let firstNameVal = new Rx.BehaviorSubject('');
let secondNameVal = new Rx.BehaviorSubject('');

const changeNameFn = (subject) => {
    return (value) => {
        subject.next(value);
    }
};

const errorFn = (err) => console.error(err);

const firstNameChange = changeNameFn(firstNameVal);
const secondNameChange = changeNameFn(secondNameVal);

firstNameVal.subscribe((value) => {
    fullName.innerHTML = `${value} ${secondNameVal.value}`;
});

secondNameVal.subscribe((value) => {
    fullName.innerHTML = `${firstNameVal.value} ${value}`;
});


Rx.Observable.fromEvent(firstName, 'keyup')
    .pluck('target', 'value')
    .subscribe (firstNameChange, errorFn);

Rx.Observable.fromEvent(secondName, 'keyup')
    .pluck('target', 'value')
    .subscribe (secondNameChange, errorFn);