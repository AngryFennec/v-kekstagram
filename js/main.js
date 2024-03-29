import { showAlert, debounce } from './util.js';

import { renderGallery } from './gallery.js';

import { getData, sendData } from './api.js';

import { showSuccessMessage, showErrorMessage } from './message.js';

import { setOnFormSubmit, hideModal } from './user-form.js';

import { init, getFilteredPictures } from './filter.js';

setOnFormSubmit(async (data) => {
  try{
    await sendData(data);
    hideModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();
  const debouncedRenderGallery = debounce(renderGallery);
  init(data, debouncedRenderGallery);
  renderGallery(getFilteredPictures());
} catch (err) {
  showAlert(err.message);
}
