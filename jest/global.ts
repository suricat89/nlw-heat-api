import environment from '../src/config/environment';
import { prismaClient } from '../src/config/database';
import { userData } from '../src/user/__data__/user.data';
import { AuthenticateUserService } from '../src/user/services/AuthenticateUserService';
import { User } from '.prisma/client';

export function setEnvironment() {
  environment.authentication.github.web = {
    clientId: 'webClientId',
    clientSecret: 'webClientSecret'
  };
  environment.authentication.github.mobile = {
    clientId: 'mobileClientId',
    clientSecret: 'mobileClientSecret'
  };
}

export async function clearDatabase() {
  await prismaClient.message.deleteMany({
    where: {
      id: { not: undefined }
    }
  });

  await prismaClient.user.deleteMany({
    where: {
      id: { not: undefined }
    }
  });
}

export async function insertTestUsers() {
  await prismaClient.user.create({
    data: {
      github_id: 1,
      login: 'adminUser1',
      avatar_url: 'https://github.com/suricat89.png',
      name: 'Admin User 1',
      profile: 'admin'
    }
  });

  await prismaClient.user.create({
    data: {
      github_id: 2,
      login: 'testUser1',
      avatar_url: 'https://github.com/suricat89.png',
      name: 'Test User 1',
      profile: 'user'
    }
  });
}

export async function insertTestMessages() {
  const adminUser = await prismaClient.user.findFirst({
    where: {
      login: 'adminUser1'
    }
  });

  const testUser = await prismaClient.user.findFirst({
    where: {
      login: 'testUser1'
    }
  });

  await prismaClient.message.create({
    data: {
      text: 'Test message 1',
      user_id: adminUser.id
    }
  });

  await prismaClient.message.create({
    data: {
      text: 'Test message 2',
      user_id: testUser.id
    }
  });

  await prismaClient.message.create({
    data: {
      text: 'Test message 3',
      user_id: testUser.id
    }
  });

  await prismaClient.message.create({
    data: {
      text: 'Test message 4',
      user_id: testUser.id
    }
  });
}

export async function getUserByLogin(login: string) {
  return prismaClient.user.findFirst({
    where: {
      login
    }
  });
}

export async function populateTestData() {
  await insertTestUsers();
  await insertTestMessages();
}

export interface ITestData {
  adminUser: User;
  nonAdminUser: User;
  nonExistingUser: User;
  adminToken: string;
  nonAdminToken: string;
  nonExistingUserToken: string;
  userWithAnotherProfileToken: string;
}

export async function getTestData() {
  const testData = {} as ITestData;
  testData.adminUser = await getUserByLogin('adminUser1');
  testData.nonAdminUser = await getUserByLogin('testUser1');
  testData.nonExistingUser = userData.user.nonExistingUser;

  const authenticateUserService = new AuthenticateUserService();
  testData.adminToken = `Bearer ${authenticateUserService._generateToken(
    testData.adminUser
  )}`;
  testData.nonAdminToken = `Bearer ${authenticateUserService._generateToken(
    testData.nonAdminUser
  )}`;
  testData.nonExistingUserToken = `Bearer ${authenticateUserService._generateToken(
    testData.nonExistingUser
  )}`;
  testData.userWithAnotherProfileToken = `Bearer ${authenticateUserService._generateToken(
    userData.user.userWithAnotherProfile
  )}`;

  return testData;
}
