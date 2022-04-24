import { htmlElements } from './CONFIG.js';
import taskTemplate from './CONFIG.js';

export default class APP {
    constructor() {
        this.lowTodoList = new Set;
        this.highTodoList = new Set;
        this.highInput = htmlElements.HIGH_INPUT;
        this.lowInput = htmlElements.LOW_INPUT;
        this.highBtn = htmlElements.HIGH_BTN;
        this.lowBtn = htmlElements.LOW_BTN;
        this.highTasks = htmlElements.HIGH_TASKS;
        this.lowTasks = htmlElements.LOW_TASKS;
    }

    run() {
    this.init();
    }

    init () {
        this.updatePage();
        this.startListener();

    }

    startListener() {
        this.highInput.addEventListener('keydown', (event) => {
            const value = this.highInput.value;
            if (event.key === 'Enter' && value) {
                this.addHighTask(value,false)
                this.highInput.value = '';
            }
        }); // high input

        this.highBtn.addEventListener('click', () => {
            const value = this.highInput.value;
            if (value) {
                this.addHighTask(value,false);
                this.highInput.value = '';
            }
        }) // high add btn

        this.lowInput.addEventListener('keydown', (event) => {
            const value = this.lowInput.value;
            if (event.key === 'Enter' && value) {
                this.addLowTask(value,false);
                this.lowInput.value = '';
            }
        }); // low input

        this.lowBtn.addEventListener('click', () => {
            const value = this.lowInput.value;
            if (value) {
                this.addLowTask(value,false);
                this.lowInput.value = '';
            }
        }); // low add btn

        this.highTasks.addEventListener("click", event => {
            if (event.target.classList.contains("done-btn")) {
                this.changeStatus(
                    event.target.parentElement.querySelector("p").innerHTML,'high');
            }
        }); // меняет статус в high секторе

        this.lowTasks.addEventListener("click", event => {
            if (event.target.classList.contains("done-btn")) {
                this.changeStatus(
                    event.target.parentElement.querySelector("p").innerHTML,'low');
            }
        }); // меняет статус в low секторе

        this.highTasks.addEventListener("click", event => {
            if (event.target.classList.contains("delete-btn")) {
                this.deleteHighTask(event.target.parentElement.querySelector("p").innerHTML);
            }
        }); // удаляет таски в high секторе

        this.lowTasks.addEventListener("click", event => {
            if (event.target.classList.contains("delete-btn")) {
                this.deleteLowTask(event.target.parentElement.querySelector("p").innerHTML);
            }
        }); // удаляет таски в low секторе
    }

    addHighTask (value,status) {
        this.highTodoList.add({[value]:status});
        this.render();
        this.setLocal();
    }

    addLowTask(value,status) {
        this.lowTodoList.add({[value]:status});
        this.render();
        this.setLocal();
    }

    changeStatus (value, priority) {
        if (priority === 'high') {
            this.highTodoList.forEach(item => {
                if (item.hasOwnProperty(value)) {
                    item[value] ? item[value] = false : item[value] = true;
                }
            })
        }
        if (priority === 'low') {
            this.lowTodoList.forEach(item => {
                if (item.hasOwnProperty(value)) {
                    item[value] ? item[value] = false : item[value] = true;
                }
            })
        }

        this.setLocal();
        this.render();
    }

    deleteHighTask(value) {
        this.highTodoList.forEach(item => {
            if (item.hasOwnProperty(value)) {
                this.highTodoList.delete(item);
            }
        })
        this.render();
        this.setLocal();
    }

    deleteLowTask(value) {
        this.lowTodoList.forEach(item => {
            if (item.hasOwnProperty(value)) {
                this.lowTodoList.delete(item);
            }
        })
        this.render();
        this.setLocal();
    }

    render() {
        this.highTasks.innerHTML = '';
        this.lowTasks.innerHTML = '';
        const high = [];
        const low = [];

        this.highTodoList.forEach(value => high.push(value))
        for (const highKey in high) {
            for (const key in high[highKey]) {
                this.highTasks.innerHTML += taskTemplate(key,high[highKey][key]);
            }
        }

        this.lowTodoList.forEach(value => low.push(value))
        for (const lowKey in low) {
            for (const key in low[lowKey]) {
                this.lowTasks.innerHTML += taskTemplate(key,low[lowKey][key]);
            }
        }

    }


    setLocal() {
        const highList = [];
        const lowList = [];
        this.highTodoList.forEach(value => highList.push(value));
        this.lowTodoList.forEach(value => lowList.push(value));
        localStorage.setItem('high', JSON.stringify(highList));
        localStorage.setItem('low',JSON.stringify(lowList));
    }

    updatePage() {
        this.getLocal();
        this.render();
    }

    getLocal() {
        if (localStorage.getItem('high')) {
            const json = JSON.parse(localStorage.getItem('high'));
            json.forEach(value => {
                this.highTodoList.add(value);
            })
        }
        if (localStorage.getItem('low')) {
            const json = JSON.parse(localStorage.getItem('low'));
            json.forEach(value => {
                this.lowTodoList.add(value);
            })
        }

    }

}
