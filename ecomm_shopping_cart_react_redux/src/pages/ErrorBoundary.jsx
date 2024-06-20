

const ErrorBoundary = () => {
    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="row">
                <div className="col-md-12">
                    <h2 className="text-danger">Something Went Wrong!!!</h2>
                </div>
            </div>
        </div>
    )
}

export default ErrorBoundary