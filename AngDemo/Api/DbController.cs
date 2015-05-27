using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Microsoft.Practices.Unity;
using Newtonsoft.Json;

namespace AngDemo.Api
{
	public class DbController : ApiController
	{
		public DbController()
		{
			UnityConfig.GetConfiguredContainer().BuildUp(typeof(DbController), this);
		}

		[Dependency]
		public AngDemo.Models.AngDemoContext Repository { get; set; }
	}
}