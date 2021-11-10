(function(){
    let app = {
        contactName: document.getElementById(`contactName`),
        mobileNumber: document.getElementById(`mobileNumber`),
        email: document.getElementById(`email`),
        addContactBtn: document.getElementById(`addContactBtn`),
        searchBox: document.getElementById(`searchBox`),
        validationErrorMessage: document.getElementById(`validationErrorMessage`),
        searchErrorMessage: document.getElementById(`searchErrorMessage`),
        contactsTable: document.getElementById(`contactTable`),


        init: function() {
            this.addContactBtn.addEventListener(`click`, app.addContact);
            this.contactsTable.addEventListener(`click`,app.SortTable);

            // delete these and change html to be ""
            this.validationErrorMessage.innerHTML = "";
            this.searchErrorMessage.innerHTML = "";
            app.setTableColours();

            this.searchBox.addEventListener(`input`, app.searchByMobile);
        },

        addContact: function(){
            // validate name
            let isValide = true;
            while(isValide === true)
            {
                isValide = app.validateNull();
                if(isValide === false)
                {
                    break;
                }

                isValide = app.validateName();
                if(isValide === false)
                {
                    break;
                }

                isValide = app.validateMobileNumber();
                if(isValide === false)
                {
                    break;
                }

                isValide = app.validateEmail();
                if(isValide === false)
                {
                    break;
                }

                app.addTableRow();
                app.resetFields();
                break;
            }
            
        },

        validateNull: function(){
            if(contactName.value === "")
            {
                validationErrorMessage.innerHTML = `Please fill Contact Name`;
                return false;
            }
            else if(mobileNumber.value === "")
            {
                validationErrorMessage.innerHTML = `Please fill PhoneNumber `;
                return false;
            }
            else if(email.value === "")
            {
                validationErrorMessage.innerHTML = `Please fill Email `;
                return false;
            }
            else
            {
                validationErrorMessage.innerHTML = ``;
                return true;
            }
        },

        validateName: function(){
            if(contactName.value.length>21)
            {
                validationErrorMessage.innerHTML = "Name too long";
                 return false;
            }
            ///^[\w\-\s]+$/
            if(contactName.value.match(`![A-Za-z0-9_]`)){
                validationErrorMessage.innerHTML = "Name can only be letters and 1 space";
                return false;
            }
            else
            {
                return true;
            }
        },

        validateMobileNumber: function(){
            if(!mobileNumber.value.match(`[^0-9]*$`))
            {
                validationErrorMessage.innerHTML = `Mobile Number must be numeric`;
                return false;
            }
            else if(mobileNumber.value.length != 10)
            {
                validationErrorMessage.innerHTML = `Mobile Number must be 10`;
                return false;
            }
            else
            {
                return true;
            }
        },

        validateEmail: function(){
            if(email.value.length>40)
            {
                validationErrorMessage.innerHTML = `Email must be less than 40 characters`;
                return false;
            }
            if(!email.value.match(`^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$`))
            {
                validationErrorMessage.innerHTML = `Email must  be correct format`;
                return false;
            }
            else
            {
                return true;
            }
        },

        addTableRow: function(){
            
            let //contactsTable = document.getElementById(`contactTable`),
            row = contactTable.insertRow(contactTable.rows.length),
            cellContactName = row.insertCell(0),
            cellMobileNumber = row.insertCell(1),
            cellEmail = row.insertCell(2);

            // may need to add css class id for td
            cellContactName.innerHTML = app.contactName.value;
            cellMobileNumber.innerHTML = app.mobileNumber.value;
            cellEmail.innerHTML = app.email.value;

            app.setTableColours();
        },

        searchByMobile: function(){
            // contactTable 
            
            let filter, rows, cell;
            filter = searchBox.value;
            rows = contactTable.getElementsByTagName(`tr`);

            // go through all the rows, filter each row to check if it contains
            // the data entered. If it does, do nothing, if it doesnt hide the row.
            for ( i=0; i <rows.length; i++)
            {
                let count = rows.length;
                cell = rows[i].getElementsByTagName(`td`)[1];
                if(cell)
                {
                    txtValue = cell.innerHTML;

                    if(txtValue.indexOf(filter) > -1)
                    {
                        rows[i].style.display = ``;
                    }
                    else
                    {
                        rows[i].style.display = `none`;
                    }
                }

                // set error message
                if(rows[i].style.display === `none`)
                {
                    count--;
                    if( count < rows.length)
                    {
                        searchErrorMessage.innerHTML =`No result Found`;
                    }
                }

                if(rows[i].style.display === ``)
                {
                    searchErrorMessage.innerHTML =``;
                }

            }
        },

        SortTable: function(){
            let rows = 0, 
            switching = true, 
            shouldSwitch = false, 
            dir =`asc`, 
            switchCount = 0;

            contactsTable = document.getElementById(`contactTable`);

            while (switching)
            {
                switching = false;
                rows = contactsTable.rows;

                for (i = 1; i < (rows.length - 1); i++) {
                    shouldSwitch = false;
                    let x = rows[i].getElementsByTagName(`TD`);
                    let y = rows[i+1].getElementsByTagName(`TD`);

                    if (dir ==`asc`)
                    {
                        // needed to make sure it selects the first cell of row
                        if(x[0].innerHTML.toLowerCase() > y[0].innerHTML.toLowerCase())
                        {
                            shouldSwitch = true;
                            break
                        }
                    }
                    else if (dir == `desc`)
                    {
                        if(x[0].innerHTML.toLowerCase() < y[0].innerHTML.toLowerCase())
                        {
                            shouldSwitch = true;
                            break
                        }
                    }
                }
                if (shouldSwitch) 
                {
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    switching = true;
                    switchCount++;
                }
                else
                {
                    if (switchCount == 0 && dir ==`asc`)
                    {
                        dir = `desc`;
                        switching = true;
                    }
                }
            }

            // change colours for new rows
            app.setTableColours();
        },

        setTableColours: function(){
            for (let i in contactTable.rows)
            {
                let row = contactTable.rows[i];

                if (i % 2 == 0 )
                {
                    row.style.backgroundColor =`#f2f2f2`;
                }
                else
                {
                    // theres an error for some reason when line to set color to white is 
                    // uncommented.
                    //row.style.backgroundColor =`#FFFFFF`;
                }
            }
        },

        resetFields: function(){
            // reset variables
            contactName.innerHTML = ``;
            mobileNumber.innerHTML = ``;
            email.innerHTML = ``;

            // reset DOM
            document.getElementById(`contactName`).value = ``;
            document.getElementById(`mobileNumber`).value = ``;
            document.getElementById(`email`).value = ``;
        }

    }

    app.init();
})();
