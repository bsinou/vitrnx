var categories = {
    all : {
        id: "all", 
        label: "All",
        icon: "public",
        postUrl: "orga-all",
        role: "VOLUNTEER",        
    },
    prog : {
        id: "prog", 
        label: "Programmation",
        icon: "queue_music",
        postUrl: "orga-prog",
        role: "VOLUNTEER",        
    },
    montage : {
        id: "montage", 
        label: "Montage",
        icon: "build",
        postUrl: "orga-montage",
        role: "VOLUNTEER",        
    },
    drink : {
        id: "drink", 
        label: "Food & Drinks",
        icon: "local_bar",
        postUrl: "orga-drink",
        role: "VOLUNTEER",        
    },
    camping : {
        id: "camping", 
        label: "Camping",
        icon: "terrain",
        postUrl: "orga-camping",
        role: "VOLUNTEER",        
    },
    activities : {
        id: "activities", 
        label: "Activities",
        icon: "child_care",
        postUrl: "orga-activities",
        role: "VOLUNTEER",        
    },
    guests : {
        id: "guests", 
        label: "Volunteers & Guests",
        icon: "people",
        postUrl: "orga-guests",
        role: "VOLUNTEER",        
    },
    admin : {
        id: "admin", 
        label: "Admin Stuff",
        icon: "account_balance",
        postUrl: "orga-admin",
        role: "MANAGER",        
    },
    finances : {
        id: "finances", 
        label: "Finances",
        icon: "attach_money",
        postUrl: "orga-finances",
        role: "MANAGER",        
    },
    website : {
        id: "website", 
        label: "Website",
        icon: "computer",
        postUrl: "orga-website",
        role: "VOLUNTEER",        
    },
}

module.exports = {
    categories,
};