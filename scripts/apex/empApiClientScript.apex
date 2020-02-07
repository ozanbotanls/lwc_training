// via platform events
// subscription channel => /event/empApi_Test__e
String msgBody = 'tell me something new';
empApi_Test__e event = new empApi_Test__e (
    Message__c = msgBody
);
Database.SaveResult result = EventBus.publish(event);

// via push topics
// subscription channel => /topic/AccountCreated
PushTopic pushTopic = new PushTopic();
pushTopic.Name = 'AccountCreated';
pushTopic.Query = 'SELECT Id, Name FROM Account';
pushTopic.ApiVersion = 47.0;
pushTopic.NotifyForOperationCreate = true;
insert pushTopic;

// create an account to test push topic
Account acc = new Account (Name='yeah, give me the name!');
insert acc;