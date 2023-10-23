using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;



namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")] 
    public class ActivitiesController : BaseApiController
    {
       
        [HttpGet]             // 获得List
        public async Task<ActionResult<List<Activity>>> GetActivities(){
            
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]     // 根据id查询
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]            // 添加

        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            await Mediator.Send(new Create.Command { Activity = activity });
            return Ok();
        }

        [HttpPut("{id}")]     // 编辑
        
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            await Mediator.Send(new Edit.Command { Activity = activity });
            return Ok();
        }

        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteActivity(Guid id)
        {
             await Mediator.Send(new Delete.Command { Id = id });
             return Ok();
        }
    }
}