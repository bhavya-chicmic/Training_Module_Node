'use strict';

/** ******************************
 **** Managing all the models ***
 ********* independently ********
 ******************************* */
module.exports = {
	SessionModel: require('./sessionModel'),
	dbVersionModel: require('./dbVersionModel'),
	AssignedPlanModel: require('./assignedPlanModel'),
	CourseModel: require('./courseModel'),
	FeedbackModel: require('./feedbackModel'),
	GithubSampleModel: require('./githubSampleModel'),
	PhaseModel: require('./phaseModel'),
	PlanModel: require('./planModel'),
	PlanTaskModel: require('./planTaskModel'),
	SubTaskModel: require('./subTaskModel'),
	TaskModel: require('./taskModel'),
	TestModel: require('./testModel'),
	UserProgressModel: require('./userProgressModel'),
	UserTimeModel: require('./userTimeModel'),
};
