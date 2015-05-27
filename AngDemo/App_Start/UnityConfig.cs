using System;
using System.Web.Mvc;
using Microsoft.Practices.Unity;
using Unity.Mvc5;
using System.Data.Entity.Infrastructure;

namespace AngDemo
{
    public static class UnityConfig
    {
		#region Unity Container
		private static readonly Lazy<IUnityContainer> Container = new Lazy<IUnityContainer>(() =>
		{
			var container = new UnityContainer();
			RegisterComponents(container);
			return container;
		});

		/// <summary>
		/// Gets the configured Unity container.
		/// </summary>
		public static IUnityContainer GetConfiguredContainer()
		{
			return Container.Value;
		}
		#endregion

		public static void RegisterComponents(IUnityContainer container)
        {
			//var container = new UnityContainer();

			container.RegisterType<AngDemo.Models.IAngDemoContext, AngDemo.Models.AngDemoContext>(new InjectionConstructor());
          
            DependencyResolver.SetResolver(new UnityDependencyResolver(container));
        }
    }
}