export const saveDraftMock = async (data) => {
return new Promise((resolve, reject) => {
setTimeout(() => {
// 80% chance of success to simulate a real, sometimes-failing network
if (Math.random() > 0.2) resolve({ success: true, id: Date.now(), ...data });
else reject(new Error("Network error."));
}, 1000);
});
};