using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngDemo.Models
{
	public interface IAngDemoContext {
		//
	}

	public class AngDemoContext : IAngDemoContext
	{
		public AngDemoEntities Context { get; private set; }

		public AngDemoContext() {
			Context = new AngDemoEntities();
		}
	}
}