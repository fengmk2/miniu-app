import { setGlobalData, createPage } from '@miniu/data';

Page(
  createPage({
    mapGlobalDataToData: {
      count: (globalData) => {
        return globalData.count;
      },
    },
    plus() {
      setGlobalData((globalData) => {
        globalData.count += 1;
      });
    },
    minus() {
      setGlobalData((globalData) => {
        globalData.count -= 1;
      });
    },
  })
);
