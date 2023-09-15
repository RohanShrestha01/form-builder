import { useDropzone } from 'react-dropzone';
import Cropper, { type Area } from 'react-easy-crop';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/Dialog';
import { useCallback, useState } from 'react';
import { CloudUploadSvg, UploadSvg } from '../../assets/icons/Svgs';
import { Button } from '../ui/Button';
import { useMutation } from '@tanstack/react-query';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import getCroppedImg from '../../lib/cropImage';
import { getEncryptedData } from '../../utils';
import { cookieMaxAge } from '../../utils/constants';
import toast from 'react-hot-toast';
import { useCookies } from 'react-cookie';
import { useAuth } from '../../contexts/AuthContext';

interface Props {
  children: React.ReactNode;
  closeHandler?: () => void;
}

export default function AvatarEditorDialog({ children, closeHandler }: Props) {
  const [image, setImage] = useState<File | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const { setAuth } = useAuth();
  const setCookie = useCookies(['userDetails'])[1];

  const { mutate } = useMutation({
    mutationFn: (data: { avatar: File | null }) =>
      axiosPrivate.patch('/user/profile', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImage(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: {
        'image/*': ['.jpeg', '.png'],
      },
    });

  const onCropComplete = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const reset = () => {
    setImage(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={open => {
        if (!open) {
          reset();
          if (closeHandler) closeHandler();
        }
        setOpen(open);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-2">
          <DialogTitle>Upload profile picture</DialogTitle>
          <DialogDescription>
            Choose a picture and crop it to upload your avatar
          </DialogDescription>
        </DialogHeader>
        {image ? (
          <div className="relative h-64">
            <Cropper
              cropShape="round"
              aspect={1}
              image={URL.createObjectURL(image)}
              crop={crop}
              zoom={zoom}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
        ) : (
          <div
            className={`group flex h-64 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed ${
              isDragActive && !isDragReject
                ? 'border-muted-foreground bg-muted'
                : 'border-slate-300 hover:border-muted-foreground hover:bg-muted'
            }`}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <CloudUploadSvg
              className={`h-10 w-10 ${
                isDragActive && !isDragReject
                  ? 'text-slate-700'
                  : 'text-muted-foreground group-hover:text-slate-700'
              }`}
            />
            {isDragReject ? (
              <p className="text-sm font-medium text-muted-foreground">
                Only *.jpeg and *.png images are accepted
              </p>
            ) : isDragActive ? (
              <p className="text-sm font-medium text-slate-700">
                Drop the image here ...
              </p>
            ) : (
              <div className="space-y-1 text-center text-sm text-muted-foreground group-hover:text-slate-700">
                <p className="font-medium">Choose or Drag & drop image</p>
                <p>(Only *.jpeg and *.png images will be accepted)</p>
              </div>
            )}
          </div>
        )}
        <DialogFooter>
          <Button
            className="gap-2"
            disabled={!image}
            isLoading={isLoading}
            onClick={async () => {
              if (!image || !croppedAreaPixels) return;
              setIsLoading(true);
              try {
                const croppedImage = await getCroppedImg(
                  URL.createObjectURL(image),
                  croppedAreaPixels,
                );

                mutate(
                  { avatar: croppedImage },
                  {
                    onSuccess: res => {
                      setAuth(prev => ({
                        ...prev,
                        ...res.data.data.user,
                      }));

                      setCookie(
                        'userDetails',
                        getEncryptedData(res.data.data.user),
                        {
                          path: '/',
                          maxAge: cookieMaxAge,
                        },
                      );

                      setOpen(false);
                      setIsLoading(false);
                      reset();
                      toast.success('Avatar uploaded successfully');
                    },
                    onError: () => toast.error('Error uploading avatar'),
                  },
                );
              } catch (e) {
                toast.error('Something went wrong!');
              }
            }}
          >
            {isLoading ? null : <UploadSvg className="h-[22px] w-[22px]" />}
            <span>Upload Avatar</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
