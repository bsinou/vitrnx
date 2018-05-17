

var admin = {
    tasks: [
        {
            id: 2,
            category: "admin",
            desc: "Double check the prefecture: this might be a little bit tricky, because they are only open on Tuesday from 9 to 11.30 AM and on Thursdays, 3 to 5PM. They also only speak Hungarish.",
            manager: "Bruno", 
            creationDate: null,
            closeDate: null,
            closeBy: null,
            cancelDate: null,
            dueDate: null,       
        },
        {
            id: 3,
            category: "admin",
            desc: "Talk with the mayor.",
            manager: "Jackie", 
            creationDate: null,
            closeDate: null,
            closeBy: null,
            cancelDate: null,
            dueDate: null,
        },
    ]
};

var prog = [
    "Call bruddi Phil",
    "Check the CCH",
    "Validate with Alma"
];

var montage = [
    "What about the sound system",
    "What about the fridge",
    "Est-ce qu'on a des rallonges",
    "Check Max and Thomas"
];

var foodAndDrink = [
    "The Mechouis",
    "The Pizzas",
    "Find a better solution for the bier",
    "Find a second provider"
];

var guests = [
    "Make some more Advertisment, count who will come ",
    "Organise Shuttles",
];


module.exports = {
    admin,
    prog,
    montage,
    foodAndDrink,
    guests
};