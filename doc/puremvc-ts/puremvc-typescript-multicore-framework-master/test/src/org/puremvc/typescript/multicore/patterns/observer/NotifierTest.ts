///<reference path='../../../../../../../../test/lib/YUITest.d.ts'/>
///<reference path='../../../../../../../../bin/puremvc-typescript-multicore-1.1.d.ts'/>

///<reference path='NotifierTestCommand' />
///<reference path='NotifierTestSub' />
///<reference path='NotifierTestVO' />

module test
{
	"use strict";

	/**
	 * Test the PureMVC Notifier class.
	 */
	export class NotifierTest
	{
		/**
		 * The name of the test case - if not provided, one is automatically generated by the
		 * YUITest framework.
		 */
		name:string = "PureMVC Notifier class tests";

		/**
		 * Tests if constructing the Notifier also create a facade instance.
		 */
		testConstructor():void
		{
			// Create a new subclass of Notifier and verify that its facade
			// has well been created
			var notifierTestSub:NotifierTestSub = new NotifierTestSub();
			notifierTestSub.initializeNotifier('NotifierTestKey1')

			// test assertions
			YUITest.Assert.isTrue
			(
				notifierTestSub.hasFacade(),
				"Expecting notifierTestSub.hasFacade() === true"
			);
		}

		/**
		 * Tests sending a Notification from the Notifier.
		 */
		testSendNotification():void
		{
			// Create the Facade, register the FacadeTestCommand to
			// handle 'NotifierTest' notifications
			var facade:puremvc.IFacade = puremvc.Facade.getInstance('NotifierTestKey2');
			facade.registerCommand( 'NotifierTestNote', NotifierTestCommand );

			// Send notification. The Command associated with the event
			// (NotifierTestCommand) will be invoked, and will multiply
			// the vo.input value by 2 and set the result on vo.result
			var vo:NotifierTestVO = new NotifierTestVO( 32 );
			facade.sendNotification( 'NotifierTestNote', vo );

			// test assertions
			YUITest.Assert.areEqual
			(
				64,
				vo.result,
				"Expecting vo.result == 64"
			);
		}
	}
}