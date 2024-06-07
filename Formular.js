document.addEventListener('DOMContentLoaded', function() {
    var form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        var name = document.getElementById('name').value;
        var id = document.getElementById('id').value;
        var birthdate = document.getElementById('birthdate').value;
        var likeness = document.getElementById('likeness').value;
        var castigator = document.getElementById('castigator').value;
        var viteza = document.getElementById('viteza').value;

        var nameRegex = /^[A-Za-z\s]{3,30}$/;

        var idRegex = /^[A-Za-z0-9]{8,20}$/;

        // formatul e de genul "YYYY-MM-DD"
        var birthdateRegex = /^\d{4}-\d{2}-\d{2}$/;

        if (!nameRegex.test(name)) {
            alert('Numele trebuie să conțină doar litere și spații, între 3 și 30 de caractere.');
            event.preventDefault();
            return;
        }

        if (!idRegex.test(id)) {
            alert('Username-ul trebuie să conțină doar litere și cifre, între 8 și 20 de caractere.');
            event.preventDefault();
            return;
        }

        if (!birthdateRegex.test(birthdate)) {
            alert('Te rog să introduci o dată validă (YYYY-MM-DD).');
            event.preventDefault();
            return;
        }

        // if (photo === '') {
        //     alert('Te rog să încarci o fotografie.');
        //     event.preventDefault();
        //     return;
        // }

        if (isNaN(parseInt(castigator))) {
            alert('Te rog să introduci un număr valid pentru câștigători.');
            event.preventDefault();
            return;
        }

        if (viteza === '') {
            alert('Te rog să introduci un timp de terminare.');
            event.preventDefault();
            return;
        }

        var data = {
            name: name,
            id: id,
            likeness: likeness
        };

        localStorage.setItem('form_data', JSON.stringify(data));

        alert('Datele au fost salvate local!');

    });
    
});
