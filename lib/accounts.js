if (Meteor.isClient) {
  AccountsTemplates.configure({

    defaultLayout: 'defaultLayout',
    defaultContentRegion: 'main',

    // Behaviour
    confirmPassword: true,
    enablePasswordChange: true,
    forbidClientAccountCreation: false,
    overrideLoginErrors: true,
    sendVerificationEmail: false,

    // Appearance
    showAddRemoveServices: false,
    showForgotPasswordLink: false,
    showLabels: true,
    showPlaceholders: true,

    // Client-side Validation
    continuousValidation: false,
    negativeFeedback: false,
    negativeValidation: true,
    positiveValidation: true,
    positiveFeedback: true,
    showValidating: true
  });

  AccountsTemplates.configureRoute('signIn');

  AccountsTemplates.configureRoute('signUp');

  AccountsTemplates.configureRoute('resetPwd');

  AccountsTemplates.configureRoute('verifyEmail');

  var passwordField = AccountsTemplates.removeField('password');
  AccountsTemplates.removeField('email');
  AccountsTemplates.addFields([
    {
      _id: "username",
      type: "text",
      displayName: "username",
      required: true,
      minLength: 5
    },
    {
      _id: 'email',
      type: 'email',
      required: true,
      displayName: "email",
      re: /.+@(.+){2,}\.(.+){2,}/,
      errStr: 'Invalid email'
    },
    passwordField
  ]);
}
else {
  Meteor.publish("users", function () {
    if (this.userId) { // We should only send data to logged in users.
      return Meteor.users.find({}, { fields: { 'username': 1, 'emails': 1, 'status': 1 } });
    }
    this.ready();
  });
}
