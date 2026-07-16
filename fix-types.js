const fs = require('fs');

const replaceInFile = (file) => {
  const content = fs.readFileSync(file, 'utf8');
  const newContent = content.replace(/fetchProfile\(session\?\.user\.id\)/g, 'fetchProfile(session?.user.id!)')
    .replace(/fetchProjects\(session\?\.user\.id\)/g, 'fetchProjects(session?.user.id!)')
    .replace(/updateProfile\(session\?\.user\.id,/g, 'updateProfile(session?.user.id!,')
    .replace(/fetchNotifications\(session\?\.user\.id\)/g, 'fetchNotifications(session?.user.id!)');
  if (content !== newContent) {
    fs.writeFileSync(file, newContent);
    console.log(`Updated ${file}`);
  }
};

replaceInFile('src/app/(app)/(tabs)/home.tsx');
replaceInFile('src/app/(app)/(tabs)/profile.tsx');
replaceInFile('src/app/(app)/(tabs)/projects.tsx');
replaceInFile('src/app/(app)/edit-profile.tsx');
replaceInFile('src/app/(app)/notifications.tsx');

fs.writeFileSync('src/global.d.ts', `declare module '*.css' {\n  const content: { [className: string]: string };\n  export default content;\n}`);
console.log('Created src/global.d.ts');
