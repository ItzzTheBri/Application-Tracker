/*
    Finds the Add Application button.
*/
const addButton =
    document.querySelector(
        "#add-application-button"
    );


/*
    Finds the Save Changes button.
*/
const saveButton =
    document.querySelector(
        "#save-button"
    );


/*
    Finds the save confirmation message.
*/
const saveMessage =
    document.querySelector(
        "#save-message"
    );


/*
    Finds the table body.
*/
const tableBody =
    document.querySelector(
        "#application-table-body"
    );


/*
    Finds the empty table message.
*/
const emptyMessage =
    document.querySelector(
        "#empty-message"
    );


/*
    Finds the Notes popup.
*/
const notesModal =
    document.querySelector(
        "#notes-modal"
    );


/*
    Finds the Notes text area.
*/
const notesTextarea =
    document.querySelector(
        "#notes-textarea"
    );


/*
    Finds the Save Notes button.
*/
const saveNotesButton =
    document.querySelector(
        "#save-notes-button"
    );


/*
    Finds the Cancel Notes button.
*/
const cancelNotesButton =
    document.querySelector(
        "#cancel-notes-button"
    );


/*
    Finds the custom delete popup.
*/
const deleteModal =
    document.querySelector(
        "#delete-modal"
    );


/*
    Finds the delete popup title.
*/
const deleteModalTitle =
    document.querySelector(
        "#delete-modal-title"
    );


/*
    Finds the delete popup message.
*/
const deleteModalMessage =
    document.querySelector(
        "#delete-modal-message"
    );


/*
    Finds the Yes button.
*/
const deleteYesButton =
    document.querySelector(
        "#delete-yes-button"
    );


/*
    Finds the No button.
*/
const deleteNoButton =
    document.querySelector(
        "#delete-no-button"
    );


/*
    Finds the X button.
*/
const closeDeleteButton =
    document.querySelector(
        "#close-delete-button"
    );


/*
    Stores all applications.
*/
let applications = [];


/*
    Stores which application's notes
    are currently being edited.
*/
let currentNotesIndex = null;


/*
    Stores which application
    might be deleted.
*/
let currentDeleteIndex = null;


/*
    Tracks whether the user is on
    the first or second delete question.
*/
let deleteStep = 1;


/*
    Tracks whether the newest row
    should play the entrance animation.
*/
let animateNewestRow = false;


/*
    Saves the applications inside
    the browser using localStorage.
*/
function saveApplications() {

    localStorage.setItem(
        "applications",
        JSON.stringify(applications)
    );

}


/*
    Loads previously saved applications.
*/
function loadApplications() {

    const savedApplications =
        localStorage.getItem(
            "applications"
        );


    if (savedApplications !== null) {

        applications =
            JSON.parse(
                savedApplications
            );


        applications.forEach(
            function (application) {

                if (
                    application.favorite === undefined
                ) {

                    application.favorite = false;

                }


                if (
                    application.notes === undefined
                ) {

                    application.notes = "";

                }

            }
        );

    }

}


/*
    Creates a blank application.
*/
function createBlankApplication() {

    return {

        favorite: false,

        company: "",

        position: "",

        type: "Internship",

        status: "Saved",

        date: "",

        notes: ""

    };

}


/*
    Creates one row inside the table.
*/
function createApplicationRow(
    application,
    index
) {

    const row =
        document.createElement(
            "tr"
        );


    row.className =
        "application-row";


    if (
        animateNewestRow === true &&
        index === applications.length - 1
    ) {

        row.classList.add(
            "new-row"
        );

    }


    row.innerHTML = `

        <td class="favorite-cell">

            <button
                class="favorite-button"
                type="button"
                aria-label="Favorite application"
            >
                ${
                    application.favorite
                        ? "★"
                        : "☆"
                }
            </button>

        </td>


        <td
            class="company-cell"
            contenteditable="true"
        >
        </td>


        <td
            class="position-cell"
            contenteditable="true"
        >
        </td>


        <td>

            <select class="type-select">

                <option value="Internship">
                    Internship
                </option>

                <option value="Job Opportunity">
                    Job Opportunity
                </option>

                <option value="Temporary Hire">
                    Temporary Hire
                </option>

            </select>

        </td>


        <td>

            <select class="status-select">

                <option value="Saved">
                    Saved
                </option>

                <option value="Applied">
                    Applied
                </option>

                <option value="Under Review">
                    Under Review
                </option>

                <option value="Interview Scheduled">
                    Interview Scheduled
                </option>

                <option value="Interviewed">
                    Interviewed
                </option>

                <option value="Offer">
                    Offer
                </option>

                <option value="Accepted">
                    Accepted
                </option>

                <option value="Rejected">
                    Rejected
                </option>

                <option value="Withdrawn">
                    Withdrawn
                </option>

            </select>

        </td>


        <td>

            <input
                class="date-input"
                type="date"
            >

        </td>


        <td>

            <button
                class="notes-button"
                type="button"
            >
                Notes
            </button>

        </td>


        <td>

            <button
                class="delete-button"
                type="button"
            >
                Delete
            </button>

        </td>

    `;


    tableBody.appendChild(
        row
    );


    const companyCell =
        row.querySelector(
            ".company-cell"
        );


    const positionCell =
        row.querySelector(
            ".position-cell"
        );


    const typeSelect =
        row.querySelector(
            ".type-select"
        );


    const statusSelect =
        row.querySelector(
            ".status-select"
        );


    const dateInput =
        row.querySelector(
            ".date-input"
        );


    companyCell.textContent =
        application.company;


    positionCell.textContent =
        application.position;


    typeSelect.value =
        application.type;


    statusSelect.value =
        application.status;


    dateInput.value =
        application.date;


    updateStatusStyle(
        statusSelect
    );


    setupRow(
        row,
        index
    );

}


/*
    Gives one application row
    its editing and button behavior.
*/
function setupRow(
    row,
    index
) {

    const favoriteButton =
        row.querySelector(
            ".favorite-button"
        );


    const companyCell =
        row.querySelector(
            ".company-cell"
        );


    const positionCell =
        row.querySelector(
            ".position-cell"
        );


    const typeSelect =
        row.querySelector(
            ".type-select"
        );


    const statusSelect =
        row.querySelector(
            ".status-select"
        );


    const dateInput =
        row.querySelector(
            ".date-input"
        );


    const notesButton =
        row.querySelector(
            ".notes-button"
        );


    const deleteButton =
        row.querySelector(
            ".delete-button"
        );


    favoriteButton.classList.toggle(
        "favorited",
        applications[index].favorite
    );


    notesButton.classList.toggle(
        "has-notes",
        applications[index].notes.trim() !== ""
    );


    favoriteButton.addEventListener(
        "click",
        function () {

            applications[index].favorite =
                !applications[index].favorite;


            favoriteButton.textContent =
                applications[index].favorite
                    ? "★"
                    : "☆";


            favoriteButton.classList.toggle(
                "favorited",
                applications[index].favorite
            );

        }
    );


    companyCell.addEventListener(
        "input",
        function () {

            applications[index].company =
                companyCell.textContent.trim();

        }
    );


    positionCell.addEventListener(
        "input",
        function () {

            applications[index].position =
                positionCell.textContent.trim();

        }
    );


    typeSelect.addEventListener(
        "change",
        function () {

            applications[index].type =
                typeSelect.value;


            updateCounters();

        }
    );


    statusSelect.addEventListener(
        "change",
        function () {

            applications[index].status =
                statusSelect.value;


            updateStatusStyle(
                statusSelect
            );


            updateCounters();

        }
    );


    dateInput.addEventListener(
        "change",
        function () {

            applications[index].date =
                dateInput.value;

        }
    );


    notesButton.addEventListener(
        "click",
        function () {

            currentNotesIndex =
                index;


            notesTextarea.value =
                applications[index].notes;


            notesModal.classList.remove(
                "hidden"
            );


            notesTextarea.focus();

        }
    );


    /*
        Opens the custom delete popup.
    */
    deleteButton.addEventListener(
        "click",
        function () {

            currentDeleteIndex =
                index;


            deleteStep =
                1;


            deleteModalTitle.textContent =
                "Delete Application?";


            deleteModalMessage.textContent =
                "Are you sure you would like to "
                + "delete this application?";


            deleteModal.classList.remove(
                "hidden"
            );

        }
    );

}


/*
    Gives the Status dropdown a color.
*/
function updateStatusStyle(
    statusSelect
) {

    statusSelect.classList.remove(
        "status-applied",
        "status-under-review",
        "status-interview",
        "status-offer",
        "status-accepted",
        "status-rejected",
        "status-withdrawn"
    );


    const status =
        statusSelect.value;


    if (
        status === "Applied"
    ) {

        statusSelect.classList.add(
            "status-applied"
        );

    }


    if (
        status === "Under Review"
    ) {

        statusSelect.classList.add(
            "status-under-review"
        );

    }


    if (
        status === "Interview Scheduled" ||
        status === "Interviewed"
    ) {

        statusSelect.classList.add(
            "status-interview"
        );

    }


    if (
        status === "Offer"
    ) {

        statusSelect.classList.add(
            "status-offer"
        );

    }


    if (
        status === "Accepted"
    ) {

        statusSelect.classList.add(
            "status-accepted"
        );

    }


    if (
        status === "Rejected"
    ) {

        statusSelect.classList.add(
            "status-rejected"
        );

    }


    if (
        status === "Withdrawn"
    ) {

        statusSelect.classList.add(
            "status-withdrawn"
        );

    }

}


/*
    Handles clicking Yes
    in the delete popup.
*/
deleteYesButton.addEventListener(
    "click",
    function () {

        /*
            First Yes changes the question.
        */
        if (deleteStep === 1) {

            deleteStep =
                2;


            deleteModalTitle.textContent =
                "Really Delete It?";


            deleteModalMessage.textContent =
                "Are you really suree?";


            return;

        }


        /*
            Second Yes deletes the application.
        */
        if (
            deleteStep === 2 &&
            currentDeleteIndex !== null
        ) {

            applications.splice(
                currentDeleteIndex,
                1
            );


            saveApplications();


            closeDeleteModal();


            displayApplications();

        }

    }
);


/*
    Clicking No closes the popup.
*/
deleteNoButton.addEventListener(
    "click",
    function () {

        closeDeleteModal();

    }
);


/*
    Clicking X closes the popup.
*/
closeDeleteButton.addEventListener(
    "click",
    function () {

        closeDeleteModal();

    }
);


/*
    Closes and resets the delete popup.
*/
function closeDeleteModal() {

    deleteModal.classList.add(
        "hidden"
    );


    currentDeleteIndex =
        null;


    deleteStep =
        1;

}


/*
    Saves notes from the popup.
*/
saveNotesButton.addEventListener(
    "click",
    function () {

        if (currentNotesIndex !== null) {

            applications[currentNotesIndex].notes =
                notesTextarea.value.trim();

        }


        closeNotesModal();


        displayApplications();

    }
);


/*
    Cancels editing notes.
*/
cancelNotesButton.addEventListener(
    "click",
    function () {

        closeNotesModal();

    }
);


/*
    Closes the Notes popup.
*/
function closeNotesModal() {

    notesModal.classList.add(
        "hidden"
    );


    notesTextarea.value =
        "";


    currentNotesIndex =
        null;

}


/*
    Displays every application.
*/
function displayApplications() {

    tableBody.innerHTML =
        "";


    applications.forEach(
        function (
            application,
            index
        ) {

            createApplicationRow(
                application,
                index
            );

        }
    );


    updateCounters();


    updateEmptyMessage();


    animateNewestRow =
        false;

}


/*
    Calculates dashboard counters.
*/
function updateCounters() {

    let applicationCount =
        applications.length;


    let internshipCount =
        0;


    let jobCount =
        0;


    let temporaryCount =
        0;


    let interviewCount =
        0;


    let offerCount =
        0;


    applications.forEach(
        function (application) {

            if (
                application.type ===
                "Internship"
            ) {

                internshipCount++;

            }


            if (
                application.type ===
                "Job Opportunity"
            ) {

                jobCount++;

            }


            if (
                application.type ===
                "Temporary Hire"
            ) {

                temporaryCount++;

            }


            if (
                application.status ===
                "Interview Scheduled" ||

                application.status ===
                "Interviewed"
            ) {

                interviewCount++;

            }


            if (
                application.status ===
                "Offer" ||

                application.status ===
                "Accepted"
            ) {

                offerCount++;

            }

        }
    );


    document.querySelector(
        "#application-count"
    ).textContent =
        applicationCount;


    document.querySelector(
        "#internship-count"
    ).textContent =
        internshipCount;


    document.querySelector(
        "#job-count"
    ).textContent =
        jobCount;


    document.querySelector(
        "#temporary-count"
    ).textContent =
        temporaryCount;


    document.querySelector(
        "#interview-count"
    ).textContent =
        interviewCount;


    document.querySelector(
        "#offer-count"
    ).textContent =
        offerCount;

}


/*
    Shows the empty message when
    there are no applications.
*/
function updateEmptyMessage() {

    if (applications.length === 0) {

        emptyMessage.style.display =
            "block";

    }

    else {

        emptyMessage.style.display =
            "none";

    }

}


/*
    Adds a new blank application.
*/
addButton.addEventListener(
    "click",
    function () {

        const newApplication =
            createBlankApplication();


        applications.push(
            newApplication
        );


        animateNewestRow =
            true;


        displayApplications();

    }
);


/*
    Saves everything when
    Save Changes is clicked.
*/
saveButton.addEventListener(
    "click",
    function () {

        saveApplications();


        saveMessage.textContent =
            "♡ Changes saved";


        saveMessage.classList.add(
            "show"
        );


        setTimeout(
            function () {

                saveMessage.classList.remove(
                    "show"
                );

            },
            2000
        );

    }
);


/*
    Runs when the webpage opens.
*/
loadApplications();


displayApplications();