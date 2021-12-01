export const healthcheckData = {
  success: { databaseStatus: { success: true, response: { status: 'OK' } } },
  error: {
    databaseStatus: {
      success: false,
      response: {
        message: 'Test error'
      }
    }
  }
};
