const getBlobFromFetchedString = async (url, defaultFileName) => {
  const fileName = url?.split('/')?.pop() || defaultFileName;

  try {
    const response = await fetch(url);
    const blob = await response.blob();
    blob.name = fileName;
    blob.lastModifiedDate = new Date();
    return blob;
  } catch (error) {
    console.error(`File downloading has been failed: `, error);
    return null;
  }
};

export default getBlobFromFetchedString;
