import { toast as orgToast, Toaster as OrgToaster } from 'react-hot-toast';

export function UIToaster() {
    return (
        <div className="toaser">
            <OrgToaster
                position="bottom-right"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    // Define default options
                    className: '',
                    duration: 5000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                    // Default options for specific types
                    success: {
                        duration: 3000,
                        iconTheme: {
                            primary: 'green',
                            secondary: 'black',
                        },
                    },
                }}
            />
        </div>
    );
}

export const toastWarning: typeof orgToast.custom = (message, options) => {
    return orgToast(message, {
        ...{
            style: {
                backgroundColor: 'red',
            }
        },
        ...options,
    });
};

export function toast(message: string) {
    console.log(`%c${message}`, 'color: orange');
    
    toastWarning(message);
}

//TODO: set atom to add message to the list of errors popup
