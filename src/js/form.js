export default () => {
    const form = document.forms.item(0);

    if(form){
        form.addEventListener('submit', event => {
            event.preventDefault();
            
            const formData = new FormData(form);
            const values = Object.fromEntries(formData.entries());
        
            console.log(values);
        });
    }
}