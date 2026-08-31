document.addEventListener('DOMContentLoaded', () => {
    const inputDetails = document.getElementById('task-details');
    const selectStatus = document.getElementById('task-status');
    const btnAdd = document.getElementById('btn-add');
    const btnToggle = document.getElementById('toggle-layout');
    const kanbanBoard = document.getElementById('kanban-board');

    let tasks = JSON.parse(localStorage.getItem('dashboard_tasks')) || [];

    function saveAndRender() {
        localStorage.setItem('dashboard_tasks', JSON.stringify(tasks));
        renderTasks();
    }

    function renderTasks() {
        document.getElementById('list-pendencia').innerHTML = '';
        document.getElementById('list-andamento').innerHTML = '';
        document.getElementById('list-concluido').innerHTML = '';

        tasks.forEach((task, index) => {
            const card = document.createElement('div');
            card.className = 'task-card';
            card.innerHTML = `
                <span>${escapeHtml(task.details)}</span>
                <button class="btn-delete" onclick="deleteTask(${index})">Excluir</button>
            `;

            const listContainer = document.getElementById(`list-${task.status}`);
            if (listContainer) {
                listContainer.appendChild(card);
            }
        });
    }

    window.deleteTask = function(index) {
        tasks.splice(index, 1);
        saveAndRender();
    };

    function escapeHtml(str) {
        return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    btnAdd.addEventListener('click', () => {
        const details = inputDetails.value.trim();
        const status = selectStatus.value;

        if (!details) {
            alert('Por favor, preencha os detalhes da tarefa!');
            return;
        }

        tasks.push({ details, status });
        inputDetails.value = '';
        saveAndRender();
    });

    if (btnToggle) {
        btnToggle.addEventListener('click', () => {
            if (kanbanBoard.style.gridTemplateColumns === '1fr') {
                kanbanBoard.style.gridTemplateColumns = 'repeat(3, 1fr)';
                btnToggle.textContent = '📱 Modo Grade (Retrato)';
            } else {
                kanbanBoard.style.gridTemplateColumns = '1fr';
                btnToggle.textContent = '💻 Modo Paisagem (Colunas)';
            }
        });
    }

    renderTasks();
});
