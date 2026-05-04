export function openModal(modal){
    modal.classList.remove('hidden');
}

export function closeModal(modal){
    modal.classList.add('hidden');
}

export function initModal({openBtn, closeBtn, modal}){
    openBtn.addEventListener('click',()=>{
        openModal(modal);
    });

    closeBtn.addEventListener('click',()=>{
        closeModal(modal);
    })
}
