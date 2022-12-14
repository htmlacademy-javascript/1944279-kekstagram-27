const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadForm = document.querySelector('.img-upload__form');
const fileChooser = uploadForm.querySelector('#upload-file');
const preview = uploadForm.querySelector('.img-upload__preview img');

const onFileChooserChange = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
};

fileChooser.addEventListener('change', onFileChooserChange);

