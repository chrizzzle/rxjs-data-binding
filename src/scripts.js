import Rx from 'rxjs/Rx';

const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const fullName = document.querySelector('#full-name');
const birthYear = document.querySelector('#select-birth-year');
const birthYearAgo = document.querySelector('#birth-years-ago');

let firstNameVal = new Rx.BehaviorSubject('first');
let lastNameVal = new Rx.BehaviorSubject('last');
let fullNameVal = new Rx.BehaviorSubject('first last');
let birthYearVal = new Rx.BehaviorSubject(2000);
let ageVal = new Rx.BehaviorSubject(0);

const nextFn = (subject) => (value) => subject.next(value);
const errorFn = (err) => console.error(err);

const firstNameChange = nextFn(firstNameVal);
const lastNameChange = nextFn(lastNameVal);
const birthYearChange = nextFn(birthYearVal);

firstNameVal.subscribe((value) => {
    fullNameVal.next(`${value} ${lastNameVal.value}`);
});

lastNameVal.subscribe((value) => {
    fullNameVal.next(`${firstNameVal.value} ${value}`);
});

birthYearVal.subscribe((value) => {
    var year = new Date().getFullYear();
    ageVal.next(year - value);
});

const changeSelect = (field, fieldNameChangeFn) =>
    Rx.Observable.fromEvent(field, 'change')
        .pluck('target', 'value')
        .subscribe (fieldNameChangeFn, errorFn);

const changeInput = (field, fieldNameChangeFn) =>
    Rx.Observable.fromEvent(field, 'keyup')
        .pluck('target', 'value')
        .subscribe (fieldNameChangeFn, errorFn);

changeInput(firstName, firstNameChange);
changeInput(lastName, lastNameChange);
changeSelect(birthYear, birthYearChange);

fullNameVal.subscribe((val) => fullName.innerHTML = val);
ageVal.subscribe((val) => birthYearAgo.innerHTML = val);