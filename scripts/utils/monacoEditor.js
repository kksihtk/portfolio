let code = `using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace PortfolioSite.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private static readonly List<TodoTask> _tasks = new()
        {
            new TodoTask { Id = 1, Title = "Написать резюме", IsDone = false },
            new TodoTask { Id = 2, Title = "Сделать портфолио", IsDone = true }
        };

        [HttpGet]
        public ActionResult<IEnumerable<TodoTask>> GetAll()
        {
            return Ok(_tasks);
        }

        [HttpGet("{id}")]
        public ActionResult<TodoTask> GetById(int id)
        {
            var task = _tasks.FirstOrDefault(t => t.Id == id);
            if (task == null) return NotFound();
            return Ok(task);
        }

        [HttpPost]
        public ActionResult<TodoTask> Create(TodoTask newTask)
        {
            newTask.Id = _tasks.Max(t => t.Id) + 1;
            _tasks.Add(newTask);
            return CreatedAtAction(nameof(GetById), new { id = newTask.Id }, newTask);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, TodoTask updatedTask)
        {
            var task = _tasks.FirstOrDefault(t => t.Id == id);
            if (task == null) return NotFound();
            task.Title = updatedTask.Title;
            task.IsDone = updatedTask.IsDone;
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var task = _tasks.FirstOrDefault(t => t.Id == id);
            if (task == null) return NotFound();
            _tasks.Remove(task);
            return NoContent();
        }
    }

    public class TodoTask
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public bool IsDone { get; set; }
    }
}`;

function loadMonacoEditor() {
    require.config({ paths: { 'vs': 'https://unpkg.com/monaco-editor@latest/min/vs' } });
    require(['vs/editor/editor.main'], function () {
        monaco.editor.create(document.getElementById('editor'), {
            value: code,
            language: 'csharp',    // подсветка для C#
            theme: 'vs-light',     // тема: vs, vs-dark, hc-black
            automaticLayout: true, // адаптация под размер контейнера
            minimap: { enabled: false } 
        });
    });
};