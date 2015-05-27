using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;

namespace AngDemo.Api
{
	public class AngDemoController : DbController
	{
		public AngDemo.Models.AngDemoEntities Context { get { return this.Repository.Context; } }

		[HttpGet]
		public string GetCategoryes()
		{
			var query = Context.CATEGORIES.Select(t => new { Id = t.ID, Name = t.SNM }).OrderBy(t => t.Name);
			return JsonConvert.SerializeObject(query.ToArray());
		}

		[HttpGet]
		public string GetProductByCategory(int categ)
		{
			var query = Context.PRODUCTS.Where(t => t.IDCAT == categ).OrderBy(t => t.SNM);
			var items = query.Select(t => new {
				Id = t.ID,
				IdCat = t.IDCAT,
				Name = t.SNM, 
				Price = t.PRICE
			});
			return JsonConvert.SerializeObject(items.ToArray());
		}

		[HttpPost]
		public string Login(string UserId, string Password)
		{
			var user = Context.USERS.SingleOrDefault(t => t.USERID == UserId && t.PASSWORD == Password);
			return (user == null) ? "Пользователь не найден" : user.ID.ToString();
		}
	}
}